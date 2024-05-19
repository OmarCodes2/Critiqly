from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.route import router
from starlette.middleware.httpsredirect import HTTPSRedirectMiddleware

app = FastAPI()

#app.add_middleware(HTTPSRedirectMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)