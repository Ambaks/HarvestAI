import { brainwave } from "../assets";

const HeaderBlank = () => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full backdrop-blur-sm">
      <div className="flex items-center px-5 py-6">
        <a href="/" className="block">
          <img src={brainwave} width={190} height={40} alt="QuikCrops" />
        </a>
      </div>
    </header>
  );
};

export default HeaderBlank;
