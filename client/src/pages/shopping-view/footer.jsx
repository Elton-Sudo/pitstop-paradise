import { Typography } from "@material-tailwind/react";
 
export function SimpleFooter() {
  return (
<footer
  className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between bg-[url('https://res.cloudinary.com/daynaexaz/image/upload/v1728893288/blue-smokebg_cegir0.jpg')] bg-cover bg-center"
>

      <Typography color="blue-gray" className="text-white">
        &copy; 2024 Pitstop Paradise
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-green-500 focus:text-green-500 text-white"
          >
            About Us
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="policies"
            color="blue-gray"
            className="font-normal transition-colors hover:text-green-500 focus:text-green-500 text-white"
          >
            Important Policies
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="shop-more"
            color="blue-gray"
            className="font-normal transition-colors hover:text-green-500 focus:text-green-500 text-white"
          >
            Shop More
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="contact"
            color="blue-gray"
            className="font-normal transition-colors hover:text-green-500 focus:text-green-500 text-white"
          >
            Contact Us
          </Typography>
        </li>
      </ul>
    </footer>
  );
}