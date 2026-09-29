import { BookA, BookOpen, LogOut, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getData } from "@/context/userContext";
import axios from "axios";
import { toast } from "sonner";

function Navbar() {
  const {user} = getData();
  const {setUser} = getData()
  const accessToken =  localStorage.getItem("accessToken")
  

  const logoutHandler =async()=>{
    try{

      const res = await axios.post(`http://localhost:8080/user/logout`,{},{
        headers:{
          Authorization: `Bearer ${accessToken}`
        }
      });

      if(res.data.success){
        setUser(null);
        toast.success(res.data.message);
        localStorage.clear();
      }

    }catch(err){
      console.log(err);
    }
  }

  return (
    <nav className="flex h-14 items-center border-b border-gray-200 bg-transparent px-2">
      <div className="max-w-7xl  flex justify-end items-center">
        {/* logo section */}
        <div className="flex gap-2 items-center">
          <BookOpen className="h-6 w-6 text-green-800" />
          <h1 className="font-bold text-xl">
            <sapn className="text-green-600">Notes</sapn> App
          </h1>
        </div>
        <div className="flex gap-7 items-center">
          <ul className="flex gap-7 items-center text-lg font-semibold">
            <li>Feature</li>
            <li>Pricing</li>
            <li>About</li>
            {user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger render={<Button variant="ghost" />}>
                    <Avatar>
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuItem><User/>Profile</DropdownMenuItem>
                      <DropdownMenuItem><BookA/>Notes</DropdownMenuItem>
                    </DropdownMenuGroup>
                    
                    <DropdownMenuGroup>                    
                      <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={logoutHandler}><LogOut/>Log out</DropdownMenuItem>

                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link to={"/login"}>
                <li>Login</li>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
