"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import myPhoto from "../../public/myphoto.png";
import Link from "next/link";

export default function Converter() {
  // daily price state
  const [rate, setRate] = useState<number | null>(null); 
// moneys state
  const [usd, setUsd] = useState<string>(""); 
  const [toman, setToman] = useState<string>(""); 

  // handling fetch data
  useEffect(() => {
    axios
      .get("/api/moneydata")
      .then((res) => setRate(res.data.usdToToman))
      .catch((err) => console.error("API Error:", err));
  }, []);

  //  toman to dollar handler
  const handleUsdChange = (val: string) => {
    setUsd(val);
    const num = parseFloat(val);
    if (rate !== null && !isNaN(num)) {
      setToman((num * rate).toFixed(0)); // دلار → تومان
    } else {
      setToman("");
    }
  };

  const handleTomanChange = (val: string) => {
    setToman(val);
    const num = parseFloat(val);
    if (rate !== null && !isNaN(num)) {
      setUsd((num / rate).toFixed(2)); // تومان → دلار
    } else {
      setUsd("");
    }
  };

  return (
    <div className="text-right p-6 space-y-4 max-w-sm my-[40px] md:my-[170px] mx-auto border rounded-xl shadow  max-[530px]:h-[90vh] bg-white">
      <h2 className="text-xl font-bold text-center text-green-600 ">
        💵 مبدل دلار ↔ تومان
      </h2>
      <h4 className="text-gray-500 rt"> لطفا فقط عدد وارد کنید🟢</h4>
      <h6 className="text-gray-500 text-[12px]">
        {" "}
        در هر بخش که اول عدد گذاری کنید در بخش دیگر مقدار تبدیل شده نمایان میشود{" "}
      </h6>
      {/* dollar sec */}
      <div>
        <label className="block mb-1 text-green-600">:💲دلار </label>
        <input
          value={usd}
          onChange={(e) => handleUsdChange(e.target.value)}
          className="border px-3 py-2 rounded w-full text-gray-800"
        />
      </div>

      {/* toman sec */}
      <div>
        <label className="block mb-1 text-amber-900">:تومان</label>
        <input
          value={toman}
          onChange={(e) => handleTomanChange(e.target.value)}
          className="border px-3 py-2 rounded w-full text-gray-800 rtl"
        />
      </div>
      {/* dayly price sec */}
      <p className="text-sm text-gray-600 text-center ">
        نرخ روز: {rate ? `${rate.toLocaleString()} تومان` : "در حال دریافت..."}
      </p>

      {/* profile */}
      <figure className="footer">
        <Link href="https://github.com/mohammadrezaafroozi" target="_blank" className="myLink">
          <i className="bi bi-github"></i>
        </Link>
        
        <Link
          href="https://www.linkedin.com/in/mohammad-reza-afroozi-65886b349/"
          target="_blank"
          className="myLink"
        >
          <i className=" bi bi-linkedin"></i>
        </Link>
        <Link
          href="https://www.instagram.com/afroozi_dev?igsh=MWNvODk2dGwwY29o"
          target="_blank"
          className="myLink"
        >
          <i className=" bi bi-instagram"></i>
        </Link>
        <Image
          src={myPhoto}
          alt="Mohammad Afroozi"
          className="rounded-full img"
        />
        <figcaption>Mohammad Afroozi</figcaption>
      </figure>
    </div>
  );
}
