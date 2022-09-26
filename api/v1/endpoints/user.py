from typing import List

from fastapi import APIRouter
from fastapi import status
from fastapi import Depends
from fastapi import HTTPException
from fastapi import Response

from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from models.user_model import UserModel
from core.deps import get_session

#Bypass worning SQLModel select
from sqlmodel.sql.expression import Select, SelectOfScalar

SelectOfScalar.inherit_cache = True # type: ignore
Select.inherit_cache = True # type: ignore
# End Bypass

router = APIRouter()

# POST USER
@router.post('/', status_code=status.HTTP_201_CREATED, response_model=UserModel)
async def post_user(user: UserModel, db: AsyncSession = Depends(get_session)):
    new_user = UserModel(
        userName=user.userName,
        email=user.email,
        name=user.name,    
        lastName=user.lastName,
        profileImageUrl=user.profileImageUrl,
        bio=user.bio,    
        gender=user.gender
    )
    
    async with db as session:
        queryUsername = select(UserModel).filter(UserModel.userName == user.userName)
        resultUsername = await session.execute(queryUsername)
        userName_result: UserModel = resultUsername.scalar_one_or_none()

        queryEmail = select(UserModel).filter(UserModel.email == user.email)
        resultEmail = await session.execute(queryEmail)
        email_result: UserModel = resultEmail.scalar_one_or_none()
        
        # Validate Username none
        if user.userName == None:
            raise HTTPException(
                detail='Missing required field: Username', 
                status_code=status.HTTP_400_BAD_REQUEST)
        # Validate Name none
        elif user.name == None:
            raise HTTPException(
                detail='Missing required field: Name', 
                status_code=status.HTTP_400_BAD_REQUEST)
        # Validate Name must be 3 to 30 characters long
        elif len(user.name) < 3 or len(user.name) > 30:
            raise HTTPException(
                detail='Name must be 3 to 30 characters long', 
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)
        # Validate Name cannot contain numbers
        elif any(i.isdigit() for i in user.name):
            raise HTTPException(
                detail='Name cannot contain numbers', 
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)
        # Validate Username must be 5 to 30 characters long
        elif len(user.userName) < 5 or len(user.userName) > 30:
            raise HTTPException(
                detail='Name must be 5 to 30 characters long', 
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)
        # Validate Username unique
        elif userName_result:
            raise HTTPException(
                detail='Username is already in use', 
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)
        # Validate Email none
        if user.email == None:
            raise HTTPException(
                detail='Missing required field: Email', 
                status_code=status.HTTP_400_BAD_REQUEST)
        # Validate email @
        elif '@' not in user.email:
            raise HTTPException(
                detail='Invalid email', 
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)
        # Validate Email unique
        elif email_result:
            raise HTTPException(
                detail='Email is already in use', 
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)
        # Validate Bio must be 3 to 30 characters long
        elif (user.bio != None) and (len(user.bio) < 3 or len(user.bio) > 30):
            raise HTTPException(
                detail='Bio must be 3 to 30 characters long', 
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)
        # Validate bio cannot contain numbers
        elif (user.bio != None) and (any(i.isdigit() for i in user.bio)):
            raise HTTPException(
                detail='Bio cannot contain numbers', 
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)
        else:
            db.add(new_user)
            await db.commit()    

    return new_user

# GET USER
@router.get('/{identify_user}', response_model=UserModel, status_code=status.HTTP_200_OK)
async def get_user(identify_user: str, db: AsyncSession = Depends(get_session)):
    async with db as session:
        if '@' in identify_user:
            query = select(UserModel).filter(UserModel.email == identify_user)
        else:
            query = select(UserModel).filter(UserModel.userName == identify_user)
        
        result = await session.execute(query)
        user: UserModel = result.scalar_one_or_none()

        if user:
            return user
        else:
            raise HTTPException(detail='User not found', status_code=status.HTTP_404_NOT_FOUND)

# PUT USER
@router.put('/{user_id}', response_model=UserModel, status_code=status.HTTP_202_ACCEPTED)
async def put_user(user_id: int, user: UserModel, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(UserModel).filter(UserModel.id == user_id)
        result = await session.execute(query)
        user_up: UserModel = result.scalar_one_or_none()

        if user_up:
            user_up.userName=user.userName
            user_up.email=user.email
            user_up.name=user.name    
            user_up.lastName=user.lastName
            user_up.profileImageUrl=user.profileImageUrl
            user_up.bio=user.bio  
            user_up.gender=user.gender

            await session.commit()
            
            return user_up
        else:
            raise HTTPException(detail='User not found', status_code=status.HTTP_404_NOT_FOUND)