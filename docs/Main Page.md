# **메인 페이지 기능 명세서 (`KoreanEats` 메인 화면)**

## **1. 개발 우선순위**

메인 페이지는 서비스의 첫 화면이므로 **가장 먼저 개발**해야 합니다. 다음과 같은 요소들을 중심으로 구현합니다.

- **필수 요소 (우선 개발)**

  - 검색 바(Search Bar)
  - 추천 레스토랑 섹션(Featured Restaurants)
  - 음식 탐색(Explore) 카드
  - 카테고리 필터

- **보조 요소 (후순위 개발)**
  - 하트(찜하기) 기능
  - 위치 기반 탐색 기능
  - 애니메이션 및 UI 개선

---

## **2. 프론트엔드 기능 명세서**

### **📌 페이지 및 파일 구조**

```
app/
├── page.tsx  # 메인 페이지 (홈)
├── layout.tsx  # 기본 레이아웃
│
widgets/
├── SearchBar.tsx  # 검색 창
├── CategoryFilter.tsx  # 카테고리 필터
├── FeaturedRestaurants.tsx  # 추천 레스토랑 리스트
├── ExploreSection.tsx  # 음식 탐색 카드 리스트
│
shared/ui/
├── button.tsx  # 공통 버튼 (ShadCN)
├── input.tsx  # 입력 필드 (ShadCN)
├── card.tsx  # 카드 컴포넌트 (ShadCN)
│
features/favorites/
├── model/favorites.ts  # 찜하기 상태 관리 (Zustand)
├── api/favorites.ts  # 찜하기 API 연동
```

---

### **📌 UI 및 기능 상세**

#### **1️⃣ 검색 바 (SearchBar.tsx)**

- **컴포넌트 위치**: `widgets/SearchBar.tsx`
- **ShadCN 컴포넌트 사용**: ✅ (Input)
- **기능**
  - 사용자가 음식명을 입력하면 해당 키워드로 검색
  - 돋보기 아이콘 클릭 시 검색 실행
  - 위치 아이콘 클릭 시 현재 위치 기반 추천

#### **2️⃣ 카테고리 필터 (CategoryFilter.tsx)**

- **컴포넌트 위치**: `widgets/CategoryFilter.tsx`
- **ShadCN 컴포넌트 사용**: ✅ (Button)
- **기능**
  - 사용자 선택에 따라 음식 리스트 필터링
  - 현재 선택된 카테고리는 스타일 강조
  - 좌우 스크롤 가능 (모바일 지원)

#### **3️⃣ 추천 레스토랑 리스트 (FeaturedRestaurants.tsx)**

- **컴포넌트 위치**: `widgets/FeaturedRestaurants.tsx`
- **ShadCN 컴포넌트 사용**: ✅ (Card)
- **기능**
  - 인기 있는 레스토랑 정보 표시 (이름, 별점, 태그)
  - "Order" 버튼 클릭 시 상세 페이지 이동
  - 하트 아이콘 클릭 시 찜하기 기능 실행

#### **4️⃣ 음식 탐색 카드 (ExploreSection.tsx)**

- **컴포넌트 위치**: `widgets/ExploreSection.tsx`
- **ShadCN 컴포넌트 사용**: ✅ (Card)
- **기능**
  - 다양한 한식 메뉴 카드 목록 제공
  - 조리 시간 및 음식명 표시
  - 하트 클릭 시 찜하기 추가

---

### **📌 API 연동 명세**

| 기능          | API 엔드포인트              | 메서드   | 요청 데이터         | 응답 데이터             |
| ------------- | --------------------------- | -------- | ------------------- | ----------------------- |
| 검색          | `/api/search`               | `GET`    | `?query=비빔밥`     | 검색 결과 리스트        |
| 추천 레스토랑 | `/api/restaurants/featured` | `GET`    | 없음                | 추천 레스토랑 리스트    |
| 음식 목록     | `/api/foods`                | `GET`    | `?category=Banchan` | 해당 카테고리 음식 목록 |
| 찜하기 추가   | `/api/favorites`            | `POST`   | `{ foodId: 1 }`     | 성공 여부               |
| 찜하기 삭제   | `/api/favorites/{id}`       | `DELETE` | `{ id: 1 }`         | 성공 여부               |

---

### **📌 테스트 체크리스트**

✅ 검색 기능이 정상 작동하는가?  
✅ 필터 선택 시 해당 음식만 표시되는가?  
✅ "Order" 버튼 클릭 시 상세 페이지로 이동하는가?  
✅ 찜하기 버튼 클릭 시 API 요청이 정상적으로 이루어지는가?  
✅ 모바일 환경에서 필터 스크롤이 원활하게 작동하는가?

---

## **3. 백엔드 기능 명세서**

### **📌 API 엔드포인트 및 파일 구조**

```
app/api/
├── search/route.ts  # 검색 API
├── restaurants/featured/route.ts  # 추천 레스토랑 API
├── foods/route.ts  # 음식 목록 API
├── favorites/route.ts  # 찜하기 API
```

---

### **📌 API 상세 명세**

#### **1️⃣ 음식 검색 API (`/api/search`)**

- **파일 위치**: `app/api/search/route.ts`
- **메서드**: `GET`
- **요청 예시**:
  ```json
  GET /api/search?query=Bibimbap
  ```
- **응답 예시**:
  ```json
  [{ "id": 1, "name": "Bibimbap", "image": "/bibimbap.jpg", "rating": 4.5 }]
  ```

---

#### **2️⃣ 추천 레스토랑 API (`/api/restaurants/featured`)**

- **파일 위치**: `app/api/restaurants/featured/route.ts`
- **메서드**: `GET`
- **요청 데이터**: 없음
- **응답 예시**:
  ```json
  [
    {
      "id": 1,
      "name": "K-BBQ House",
      "rating": 4.7,
      "tags": ["Authentic", "Spicy"],
      "image": "/kbqq.jpg"
    }
  ]
  ```

---

#### **3️⃣ 음식 리스트 API (`/api/foods`)**

- **파일 위치**: `app/api/foods/route.ts`
- **메서드**: `GET`
- **요청 예시**:
  ```json
  GET /api/foods?category=Banchan
  ```
- **응답 예시**:
  ```json
  [
    {
      "id": 1,
      "name": "Kimchi",
      "image": "/kimchi.jpg",
      "cookingTime": "10 min"
    }
  ]
  ```

---

#### **4️⃣ 찜하기 API (`/api/favorites`)**

- **파일 위치**: `app/api/favorites/route.ts`
- **메서드**: `POST`
- **요청 예시**:
  ```json
  POST /api/favorites
  {
    "foodId": 1
  }
  ```
- **응답 예시**:

  ```json
  { "success": true }
  ```

- **메서드**: `DELETE`
- **요청 예시**:
  ```json
  DELETE /api/favorites/1
  ```
- **응답 예시**:
  ```json
  { "success": true }
  ```

---

### **📌 데이터베이스 설계 (Drizzle ORM)**

- **테이블: `restaurants`**
  ```ts
  id: number;
  name: string;
  rating: number;
  tags: string[];
  image: string;
  ```
- **테이블: `foods`**
  ```ts
  id: number;
  name: string;
  image: string;
  cookingTime: string;
  ```
- **테이블: `favorites`**
  ```ts
  id: number;
  userId: number;
  foodId: number;
  ```

---

### **📌 테스트 체크리스트**

✅ 검색 시 올바른 결과가 반환되는가?  
✅ 추천 레스토랑 API가 정상 작동하는가?  
✅ 카테고리 필터가 정상 작동하는가?  
✅ 찜하기 기능이 정상 작동하는가?

---

## **최종 개발 순서**

1️⃣ **검색 바** 구현  
2️⃣ **카테고리 필터** 개발  
3️⃣ **추천 레스토랑 API 연동**  
4️⃣ **Explore 섹션 개발**  
5️⃣ **찜하기 기능 추가**
