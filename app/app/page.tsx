import Image from "next/image";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import {
  BsCloud,
  BsClipboardMinus,
  BsFileEarmarkArrowDown,
} from "react-icons/bs";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="flex items-center justify-center gap-32 mt-20">
        <div className="max-w-md flex flex-col gap-4 items-center">
          <div className="text-center mt-24 text-5xl font-bold">
            Know your cars value in seconds!
          </div>
          <div className="text-center mt-4 text-xl">
            Our car evaluator uses AI model to anylize and evaluate your cars
            value in no time.
          </div>
          <Link href={"/evaluator"} className="button-colors px-4 py-2 rounded-md">
            Try now!
          </Link>
        </div>
        <Image
          src="/images/hero-white.png"
          width={300}
          height={300}
          alt="Car Evaluator"
        />
      </div>
      <div className="text-center mt-32 text-3xl font-bold">
        Trusted by over 10 000 users!
      </div>
      <div className="flex justify-center mt-4 gap-10">
        <div className="text-center max-w-xs">
          <p className="text-2xl">
            &quot;This tool saved me a lot of time and money!&quot;
          </p>
          <p className="mt-2 text-sm text-gray-500">- Happy Customer</p>
          <div className="flex justify-center mt-2">
            {[...Array(5)].map((_, i) => (
              <AiFillStar key={i} className="text-yellow-500" />
            ))}
          </div>
        </div>
        <div className="text-center max-w-xs">
          <p className="text-2xl">
            &quot;Accurate and easy to use. Highly recommend!&quot;
          </p>
          <p className="mt-2 text-sm text-gray-500">- Satisfied User</p>
          <div className="flex justify-center mt-2">
            {[...Array(5)].map((_, i) => (
              <AiFillStar key={i} className="text-yellow-500" />
            ))}
          </div>
        </div>
        <div className="text-center max-w-xs">
          <p className="text-2xl">
            &quot;A must-have for anyone buying or selling a car.&quot;
          </p>
          <p className="mt-2 text-sm text-gray-500">- Car Enthusiast</p>
          <div className="flex justify-center mt-2">
            {[...Array(5)].map((_, i) => (
              <AiFillStar key={i} className="text-yellow-500" />
            ))}
          </div>
        </div>
      </div>
      <div className="text-center mt-20 text-3xl font-bold">
        ...and that's just the beginning!
      </div>
      <div className="text-center mt-4 text-2xl max-w-4xl mx-auto">
        We are rapidly growing and improving our services to provide you with
        the best car evaluation experience. Stay tuned for more updates and
        features!
      </div>
      <hr className="w-[450px] border-t-2 border-gray-700 my-8" />
      <div className="text-center mt-24 text-4xl font-bold">
        What makes us special?
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12 mx-8 md:mx-32">
        <div className="text-center p-4 bg-gray-800 text-white rounded-lg shadow-md h-64 max-w-xs mx-auto">
          <BsCloud className="text-4xl mx-auto mb-2" /> {/* Add BsCloud icon */}
          <h3 className="text-2xl font-bold mb-4">Advanced AI</h3>
          <p className="text-lg">
            Our advanced AI model is trained on thousands of car listings,
            allowing us to provide precise and reliable car evaluations in
            seconds.
          </p>
        </div>
        <div className="text-center p-4 bg-gray-800 text-white rounded-lg shadow-md h-64 max-w-xs mx-auto">
          <BsClipboardMinus className="text-4xl mx-auto mb-2" />
          <h3 className="text-2xl font-bold mb-4">User-Friendly Interface</h3>
          <p className="text-lg">
            Our intuitive and easy-to-use interface ensures that you can quickly
            and effortlessly get the information you need, whether you're buying
            or selling a car.
          </p>
        </div>
        <div className="text-center p-4 bg-gray-800 text-white rounded-lg shadow-md h-64 max-w-xs mx-auto">
          <BsFileEarmarkArrowDown className="text-4xl mx-auto mb-2" />{" "}
          {/* Add BsFileEarmarkArrowDown icon */}
          <h3 className="text-2xl font-bold mb-4">Comprehensive Data</h3>
          <p className="text-lg">
            We utilize a vast database of car prices and market trends to
            provide you with the most comprehensive and up-to-date car
            evaluations.
          </p>
        </div>
      </div>
      <button className="button-colors px-6 py-3 text-xl rounded-md mt-10 mb-20">
        Get Your Evaluation Now!
      </button>
    </div>
  );
}
