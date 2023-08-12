import Image from "next/image";
import logo from "../../images/logo.png";
import cartIcon from "../../images/cartIcon.png";
import { BiCaretDown } from "react-icons/bi";
import { HiOutlineSearch } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { StateProps } from "../../../type";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { addUser } from "@/store/nextSlice";

const Header = () => {
  const { data: session } = useSession();
  const { productData, favouriteData, userInfo } = useSelector(
    (state: StateProps) => state.next
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (session) {
      dispatch(
        addUser({
          name: session?.user?.name,
          email: session?.user?.email,
          image: session?.user?.image,
        })
      );
    }
  }, [session]);

  return (
    <div className="w-full h-20 bg-amazon_blue text-lightText sticky top-0 z-50">
      <div className="h-full w-full mx-auto inline-flex items-center justify-between gap-1 mdl:gap-3 px-4">
        {/* logo */}
        <Link href={"/"}>
          <div className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 flex items-center justify-center h-[70%]">
            <Image
              className="w-28 object-cover mt-1"
              src={logo}
              alt="logoImage"
            />
          </div>
        </Link>
        {/* deliver */}
        <div className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 items-center justify-center h-[70%] hidden lgl:inline-flex gap-1">
          <SlLocationPin />
          <div className="text-xs">
            <p>Deliver to</p>
            <p className="text-white font-bold uppercase">RSA</p>
          </div>
        </div>
        {/* searchbar */}
        <div className="flex-1 h-10 hidden md:inline-flex items-center justify-between relative">
          <input
            className="w-full h-full rounded-md px-2 placeholder:text-sm text-base text-black border-[3px] border-transparent outline-none focus-visible:border-amazon_yellow"
            type="text"
            placeholder="Search dean_amazon products"
            id=""
          />
          <span className="w-12 h-full bg-amazon_yellow text-black text-2xl flex items-center justify-center absolute right-0 rounded-tr-md rounded-br-md">
            <HiOutlineSearch />
          </span>
        </div>
        {/* signin */}
        {userInfo ? (
          <div className="flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70] gap-1">
            <img className="w-7 h-7 rounded-full object-cover" src={userInfo.image} alt="userImage" />
            <div className="text-xs text-gray-100 flex flex-col">
              <p className="text-white font-bold">{userInfo.name}</p>
              <p>{userInfo.email}</p>
            </div>
          </div>
        ) : (
          <div
            onClick={() => signIn()}
            className="text-xs text-gray-100% flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer  duration-300 h-[70]"
          >
            <p>Hello, sign in</p>
            <p className="text-white font-bold flex items-center">
              Account & Lists{" "}
              <span>
                <BiCaretDown />
              </span>
            </p>
          </div>
        )}

        {/* favourite */}
        <div className="text-xs text-gray-100% flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer  duration-300 h-[70] relative">
          <p>Marked</p>
          <p className="text-white font-bold ">& Favourite</p>
          {favouriteData.length > 0 && (
            <span className="absolute right-2 top-0.5 w-4 h-4 border-[1px] border-gray-400 flex items-center justify-center text-xs text-amazon_yellow">
              {favouriteData.length}
            </span>
          )}
        </div>
        {/* cart */}
        <Link
          href={"/Cart"}
          className="flex items-center px-2 border border-transparent hover:border-white cursor-pointer  duration-300 h-[70] relative"
        >
          <Image
            className="w-auto object-cover h-8"
            src={cartIcon}
            alt="carIMG"
          />
          <p className="text-xs text-white font-bold mt-3">Cart</p>
          <span className="absolute text-amazon_yellow text-sm left-[29px] top-0 font-semibold">
            {productData ? productData.length : 0}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
