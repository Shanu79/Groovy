import { getProviders, signIn } from "next-auth/react";

function Login({ providers }) {
  return (
    <div className="flex flex-col items-center bg-[#2b1c19] min-h-screen w-full justify-center">
      <div className="flex items-center gap-4 mb-5">
        {/* <img className="w-52" src="https://links.papareact.com/9xl" alt="" /> */}
        <h1 className="text-3xl text-[#f8dcd8] font-semibold font-Kaushan">
        Groovy
        </h1>
      </div>

      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-[#ffb4a8] text-[#2b1c19] p-3 rounded-md"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
