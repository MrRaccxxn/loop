import { Button } from "@/components/ui/button";
import { VscChevronRight } from "react-icons/vsc";
import { useForm, SubmitHandler } from "react-hook-form"

import Image from "next/image";
import { useAppKit } from "@reown/appkit/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/router";

type Inputs = {
    amount: number
    period: string
  }

export default function RequestLoan() {
  const { open } = useAppKit();
  const router = useRouter();

  return (
    <div className="bg-purple-800 w-full h-full bg-white">
      <div className="h-[30%] w-full bg-[#EFC950] relative">
        <Image
          src="/img/request-loan-bg.png"
          alt="Loan background"
          layout="fill"
          objectFit="fill"
        />
      </div>
      <div className="h-[70%] flex flex-col p-6 justify-between">
        <div className="flex flex-col gap-6 justify-between">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label
              htmlFor="picture"
              className="text-black font-light text-left text-nowrap flex flex-row gap-2"
            >
              Amount <p className="text-black opacity-40">(Expresed in USD)</p>
            </Label>
            <Input
              pattern="[0-9]*"
              inputMode="numeric"
              type="number"
              className="bg-[#f5f5fa] text-black"
            />
          </div>
          <div>
            <Slider
              defaultValue={[50]}
              max={100}
              step={1}
              className="bg-[#DB8323]"
              color="DB8323"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Label
              htmlFor="picture"
              className="text-black font-light text-left"
            >
              Credit type
            </Label>
            <p className="text-xs text-black opacity-40">
              Choose the credit types you need—this won’t be stored and is only
              for analysis purposes.
            </p>
            <Select>
              <SelectTrigger className="bg-[#f5f5fa] text-black">
                <SelectValue placeholder="Select what will be the credit used for" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="banana">Healhcare</SelectItem>
                  <SelectItem value="blueberry">Education</SelectItem>
                  <SelectItem value="grapes">Debt Consolidation</SelectItem>
                  <SelectItem value="pineapple">Housing</SelectItem>
                  <SelectItem value="pineapple">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full">
            <Label
              htmlFor="picture"
              className="text-black font-light text-left"
            >
              Period
            </Label>
            <Select>
              <SelectTrigger className="bg-[#f5f5fa] text-black">
                <SelectValue placeholder="Select a period" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="banana">3 Months</SelectItem>
                  <SelectItem value="blueberry">6 Months</SelectItem>
                  <SelectItem value="grapes">1 Year</SelectItem>
                  <SelectItem value="pineapple">2 Years</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            className="bg-[#DB8323] text-[#ffffff] rounded-xl text-md w-full items-center h-11"
            onClick={() => open({ view: "Connect" })}
          >
            Continue
          </Button>
          <Button
            className="text-black"
            variant={"ghost"}
            onClick={() => router.push('/home')}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
