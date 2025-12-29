from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from .database import get_db, engine, Base
from .models import User, Product, CartItem, WishlistItem
from .auth import authenticate_user, create_access_token, get_current_user, get_password_hash
from datetime import timedelta

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class UserCreate(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class CartItemCreate(BaseModel):
    product_id: int
    quantity: int

class WishlistItemCreate(BaseModel):
    product_id: int

# Auth routes
@app.post("/register", response_model=Token)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = get_password_hash(user.password)
    db_user = User(username=user.email, email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    access_token = create_access_token(data={"sub": user.email}, expires_delta=timedelta(minutes=30))
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = authenticate_user(db, user.email, user.password)
    if not db_user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    access_token = create_access_token(data={"sub": user.email}, expires_delta=timedelta(minutes=30))
    return {"access_token": access_token, "token_type": "bearer"}

# Cart routes
@app.get("/cart")
def get_cart(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    cart_items = db.query(CartItem).filter(CartItem.user_id == current_user.id).all()
    # Include product details
    cart_with_products = []
    for item in cart_items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if product:
            cart_with_products.append({
                "id": item.id,
                "product_id": item.product_id,
                "quantity": item.quantity,
                "name": product.name,
                "price": product.price,
                "image": product.image
            })
    return cart_with_products

@app.post("/cart")
def add_to_cart(item: CartItemCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    existing_item = db.query(CartItem).filter(CartItem.user_id == current_user.id, CartItem.product_id == item.product_id).first()
    if existing_item:
        existing_item.quantity += item.quantity
    else:
        cart_item = CartItem(user_id=current_user.id, product_id=item.product_id, quantity=item.quantity)
        db.add(cart_item)
    db.commit()
    return {"message": "Item added to cart"}

@app.put("/cart/{item_id}")
def update_cart_quantity(item_id: int, quantity: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    cart_item = db.query(CartItem).filter(CartItem.id == item_id, CartItem.user_id == current_user.id).first()
    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")
    cart_item.quantity = quantity
    db.commit()
    return {"message": "Cart updated"}

@app.delete("/cart/{item_id}")
def remove_from_cart(item_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    cart_item = db.query(CartItem).filter(CartItem.id == item_id, CartItem.user_id == current_user.id).first()
    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")
    db.delete(cart_item)
    db.commit()
    return {"message": "Item removed from cart"}

# Wishlist routes
@app.get("/wishlist")
def get_wishlist(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    wishlist_items = db.query(WishlistItem).filter(WishlistItem.user_id == current_user.id).all()
    # Include product details
    wishlist_with_products = []
    for item in wishlist_items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if product:
            wishlist_with_products.append({
                "id": item.id,
                "product_id": item.product_id,
                "name": product.name,
                "price": product.price,
                "image": product.image
            })
    return wishlist_with_products

@app.post("/wishlist")
def add_to_wishlist(item: WishlistItemCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    existing_item = db.query(WishlistItem).filter(WishlistItem.user_id == current_user.id, WishlistItem.product_id == item.product_id).first()
    if existing_item:
        raise HTTPException(status_code=400, detail="Item already in wishlist")
    wishlist_item = WishlistItem(user_id=current_user.id, product_id=item.product_id)
    db.add(wishlist_item)
    db.commit()
    return {"message": "Item added to wishlist"}

@app.delete("/wishlist/{item_id}")
def remove_from_wishlist(item_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    wishlist_item = db.query(WishlistItem).filter(WishlistItem.id == item_id, WishlistItem.user_id == current_user.id).first()
    if not wishlist_item:
        raise HTTPException(status_code=404, detail="Wishlist item not found")
    db.delete(wishlist_item)
    db.commit()
    return {"message": "Item removed from wishlist"}

# Products route (static for now)
@app.get("/products")
def get_products():
    # For now, return static products. In future, can add to DB
    return [
        {"id": 1, "name": "Lipstick", "price": 10.99, "image": "/images/lipstick.jpg"},
        {"id": 2, "name": "Shoes", "price": 49.99, "image": "/images/shoes.jpg"},
        # Add more products as needed
    ]
