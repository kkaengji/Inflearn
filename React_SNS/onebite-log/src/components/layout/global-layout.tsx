import { Link, Outlet } from "react-router";
import logo from "@/assets/logo.png";

export default function GlobalLayout() {
  return (
    <div>
      <header>
        <div>
          <Link to={"/"}>
            <img
              src={logo}
              alt="한입 로그 로고, 메세지 말풍선을 형상화한 모양이다"
            />
            <div className="font-bold">한입 로그</div>
          </Link>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
