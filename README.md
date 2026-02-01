# Personal Portfolio - Jekyll + GitHub Pages

LinkedIn 스타일의 개인 이력 사이트입니다.

## Quick Start

### 로컬 실행

```bash
# Ruby 및 Bundler 설치 필요
bundle install
bundle exec jekyll serve
```

브라우저에서 http://localhost:4000 접속

### GitHub Pages 배포

1. GitHub에 저장소 생성
2. 코드 푸시
3. Settings > Pages > Source를 main branch로 설정
4. https://username.github.io/repo-name 에서 확인

## 커스터마이징

### 이력 정보 수정

`_data/resume.yml` 파일을 수정하세요:

- `profile`: 이름, 직함, 소개, 연락처
- `experience`: 경력 사항
- `education`: 학력
- `skills`: 기술 스택
- `projects`: 프로젝트/특허
- `publications`: 학술 실적
- `certifications`: 자격증
- `awards`: 수상 내역

### 프로필 사진 변경

`assets/images/profile.jpg` 파일을 교체하세요.

### 사이트 설정

`_config.yml`에서 사이트 제목, URL 등을 수정하세요.

## 파일 구조

```
├── _config.yml          # Jekyll 설정
├── _data/resume.yml     # 이력 데이터
├── _includes/           # 섹션 컴포넌트
├── _layouts/            # 레이아웃
├── assets/
│   ├── css/style.css    # 스타일시트
│   ├── js/main.js       # JavaScript
│   └── images/          # 이미지
└── index.html           # 메인 페이지
```
