from typing import Optional
from sqlmodel import Field, SQLModel

class UserModel(SQLModel, table=True):
    __tablename__: str = "users"

    id: Optional[int] = Field(default=None, primary_key=True)
    userName: Optional[str]
    email: Optional[str]
    name: Optional[str]    
    lastName: Optional[str]
    profileImageUrl: Optional[str]
    bio: Optional[str]    
    gender: Optional[str] = "Not Specified"

class UserGithubModel(SQLModel, table=False):
    id: Optional[int]
    userName: Optional[str]
    email: Optional[str]
    name: Optional[str]  
    lastName: Optional[str]
    profileImageUrl: Optional[str]
    bio: Optional[str]
    gender: Optional[str]
    followers: Optional[int]
    following: Optional[int]
    public_repos: Optional[int]
    url_public: Optional[str]