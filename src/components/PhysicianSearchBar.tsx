"use client";

import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";

interface PhysicianSearchBarProps {
  name?: string;
}

const PhysicianSeachBar = ({ name }: PhysicianSearchBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nameValue = formData.get("name")?.toString() || "";

    const params = new URLSearchParams(searchParams.toString());

    if (!nameValue) params.delete("name");
    else params.set("name", nameValue);

    params.delete("page");

    const query = params.toString();

    router.push(`/search/physicians${query ? `?${query}` : ""}`);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <Input
          id="name"
          name="name"
          aria-label="Physician name"
          defaultValue={name}
          placeholder="Search by name"
          className="rounded-full"
        />
        <Button
          type="submit"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 -translate-x-[.5px] h-full rounded-e-full border border-s-0"
        >
          <Search />
        </Button>
      </form>
    </div>
  );
};

export default PhysicianSeachBar;
