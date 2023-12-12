import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-sky-300 text-blue-800 p-4">
      <ul className="flex justify-between text-2xl font-bold">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/signup">Sign up</Link>
        </li>
        <li>
          <Link href="/api/auth/signin">Sign In</Link>
        </li>
        <li>
          <Link href="/api/auth/signout">Sign Out</Link>
        </li>
        <li>
          <Link href="/server">Server</Link>
        </li>
        <li>
          <Link href="/client">Client</Link>
        </li>
        <li>
          <Link href="/extra">Extra</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
