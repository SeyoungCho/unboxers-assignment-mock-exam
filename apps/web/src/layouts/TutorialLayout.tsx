import { Button } from "@/components/ui/button";
import logoNav from "@/assets/images/logo-nav.png";
import { Outlet } from "react-router-dom";

function TutorialLayout() {
  return (
    <div className="flex h-full flex-col">
      <header className="h-nav relative z-50 shrink-0 bg-white px-6">
        <nav className="flex h-full">
          <LogoContainer />
          <TitleContainer />
          <UtilityContainer />
        </nav>
      </header>
      <div className="h-[calc(100dvh-var(--spacing-nav))]">
        <Outlet />
      </div>
    </div>
  );
}

function LogoContainer() {
  return (
    <div className="flex h-full flex-1 items-center">
      <img src={logoNav} alt="logo" className="h-10" />
    </div>
  );
}

function TitleContainer() {
  return (
    <div className="flex h-full flex-1 items-center justify-center text-3xl">
      <h1 className="text-xl font-bold">모의고사 모드</h1>
    </div>
  );
}

function UtilityContainer() {
  return (
    <div className="flex h-full flex-1 items-center justify-end">
      <Button variant="secondary">홈으로</Button>
    </div>
  );
}

export default TutorialLayout;
