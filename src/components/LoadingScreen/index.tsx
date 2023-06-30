import Header from '../Header';

export default function LoadingScreen() {
  return (
    <>
      <Header />
      <div className="p-5 bg-zinc-50 h-screen">
        <div className="w-[262px] h-[70px] bg-zinc-200 rounded-lg mb-5"></div>

        <div className="grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 gap-3 p-5">
          <div className="rounded-md w-98 bg-zinc-200"></div>
          <div className="rounded-md w-98 bg-zinc-200"></div>
          <div className="rounded-md w-98 bg-zinc-200"></div>
          <div className="rounded-md w-98 bg-zinc-200"></div>
          <div className="rounded-md w-98 bg-zinc-200"></div>
          <div className="rounded-md w-98 bg-zinc-200"></div>
          <div className="rounded-md w-98 bg-zinc-200"></div>
        </div>
      </div>
    </>
  );
}
