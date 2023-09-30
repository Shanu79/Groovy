import {
  HomeIcon,
  SearchIcon,
  CollectionIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from "@heroicons/react/outline";

function Sidebar() {
  
  return (
  <div className={`bg-[#2b1c19] text-rose-100 p-7 text-sm w-1/5 lg:text-lg h-screen hidden md:inline-flex`}>
      <div className="my-auto space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        
        <button
          className="flex items-center space-x-2
        hover:text-white"
        >
          <CollectionIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>

        <button
          className="flex items-center space-x-2
        hover:text-white"
        >
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create a Playlist</p>
        </button>
        <button
          className="flex items-center space-x-2
        hover:text-white"
        >
          <HeartIcon className="h-5 w-5" />
          <p>Loved Songs</p>
        </button>
        <button
          className="flex items-center space-x-2
        hover:text-white"
        >
          <RssIcon className="h-5 w-5" />
          <p>Your Episodes</p>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
