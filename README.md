# 내 소개 페이지

React + FastAPI로 만든 소개 페이지 프로젝트입니다.

## 구조

- `frontend/` - React + Vite + Biome
- `backend/` - FastAPI + uv + Ruff

## Frontend 설정

- **패키지 매니저**: bun
- **빌드**: Vite
- **린터/포매터**: Biome

## Backend 설정

- **패키지 매니저**: uv
- **프레임워크**: FastAPI
- **린터/포매터**: Ruff

## 시작하기

### Frontend
```bash
cd frontend
bun install
bun dev
```

### Backend
```bash
cd backend
uv sync
uv run fastapi dev main.py
```
