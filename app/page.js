import Chatbot from "./components/Chatbot"
export default function Home(){
  return(
    <div className="flex flex-col items-center pt-12">
      <h1 className="text-green-600 text-4xl font-bold">Welcome to AutoHub</h1>
      <p className="text-gray-500 mt-5 italic">We sell quality,trusted and affordable vehicles</p>

<Chatbot/>
    </div>
  )
}