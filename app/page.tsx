import { RestaurantCard } from "./components/RestaurantCard";
import { MOCK_RESTAURANTS } from "@/shared/lib/mock-data";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { ThemeBadges } from "./components/ThemeBadges";

// 랜덤으로 6개의 레스토랑을 선택하는 함수
function getRandomRestaurants(
  restaurants: typeof MOCK_RESTAURANTS,
  count: number
) {
  const shuffled = [...restaurants].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function Home() {
  const randomRestaurants = getRandomRestaurants(MOCK_RESTAURANTS, 6);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* 모바일 컨테이너 */}
        <div className="mx-auto w-full max-w-[480px] px-4 py-6">
          {/* 검색바 섹션 */}
          <section className="mb-4">
            <SearchBar />
          </section>

          {/* 테마 뱃지 섹션 */}
          <section className="mb-8">
            <ThemeBadges />
          </section>

          {/* 레스토랑 목록 섹션 */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                Recommended
              </span>
              <h2 className="text-xl font-semibold">Restaurant List</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {randomRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  id={restaurant.id}
                  name={restaurant.name}
                  description={restaurant.description}
                  imageUrl={restaurant.imageUrl}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
