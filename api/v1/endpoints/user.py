from typing import List

from fastapi import APIRouter
from fastapi import status
from fastapi import Depends
from fastapi import HTTPException
from fastapi import Response

from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from models.user_model import UserModel, UserGithubModel
from core.deps import get_session
from core.configs import settings
import requests
import json

#Bypass worning SQLModel select
from sqlmodel.sql.expression import Select, SelectOfScalar

SelectOfScalar.inherit_cache = True # type: ignore
Select.inherit_cache = True # type: ignore
# End Bypass

router = APIRouter()

# POST USER
@router.post('/', 
    status_code=status.HTTP_201_CREATED, 
    response_model=UserModel,
    summary="Cadastro de usuário"
)
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

# POST USER GITHUB
@router.post('/github', 
    status_code=status.HTTP_201_CREATED, 
    response_model=UserModel,
    summary="Cadastro de usuário com Github",
    description="Cadastro de usuário utilizando dados do Github"
)
async def post_user_github(user: UserModel, db: AsyncSession = Depends(get_session)):
    request = requests.get(settings.BASE_URL_GITHUB + "/users/" + user.userName)
    userJson = json.loads(request.content)

    name = None if userJson["name"] is None else userJson["name"].split()
    nameUser = name if name is None else name[0]
    lastNameUser = name if name is None else name[len(name) -1]
    bio = None if userJson["bio"] is None else userJson["bio"][:30]

    new_user = UserModel(
        userName=userJson["login"],
        email=userJson["email"],
        name=nameUser,   
        lastName=lastNameUser,
        profileImageUrl=userJson["avatar_url"],
        bio=bio,   
        gender=None
    )

    async with db as session:
        queryUsername = select(UserModel).filter(UserModel.userName == user.userName)
        resultUsername = await session.execute(queryUsername)
        userName_result: UserModel = resultUsername.scalar_one_or_none()

        # Validate Username unique
        if userName_result:
          raise HTTPException(
              detail='Username is already in use', 
              status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)
        # Validate Name none
        elif name is None:
            raise HTTPException(
                detail='Missing required field: Name', 
                status_code=status.HTTP_400_BAD_REQUEST)
        else:
            db.add(new_user)
            await db.commit()

    return new_user

# GET USER
@router.get('/{identify_user}', 
    response_model=UserGithubModel, 
    status_code=status.HTTP_200_OK,
    summary="Consultar usuário",
    description="Consultar usuário por e-mail/username"
)
async def get_user(identify_user: str, db: AsyncSession = Depends(get_session)):
    async with db as session:
        if '@' in identify_user:
            query = select(UserModel).filter(UserModel.email == identify_user)
        else:
            query = select(UserModel).filter(UserModel.userName == identify_user)
        
        result = await session.execute(query)
        user: UserModel = result.scalar_one_or_none()

        if user:
            request = requests.get(settings.BASE_URL_GITHUB + "/users/" + user.userName)
            userJson = json.loads(request.content)

            user_response = UserGithubModel(
                id=user.id,
                userName=user.userName,
                email=user.email,
                name=user.name,  
                lastName=user.lastName,
                profileImageUrl=user.profileImageUrl,
                bio=user.bio,   
                gender=user.gender,
                followers=userJson["followers"],
                following=userJson["following"],
                public_repos=userJson["public_repos"],
                url_public=userJson["html_url"]
            )
        else:
            raise HTTPException(detail='User not found', status_code=status.HTTP_404_NOT_FOUND)
    return user_response

# PUT USER
@router.put('/{user_id}', 
    response_model=UserModel, 
    status_code=status.HTTP_202_ACCEPTED,
    summary="Atualizar usuário",
    description="Atualizar o usuário por meio do id"
)
async def put_user(user_id: int, user: UserModel, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(UserModel).filter(UserModel.id == user_id)
        result = await session.execute(query)
        user_up: UserModel = result.scalar_one_or_none()

        if user_up:
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