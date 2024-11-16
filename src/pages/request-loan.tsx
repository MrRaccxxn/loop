import { Button } from "@/components/ui/button";
import { VscChevronRight } from "react-icons/vsc";
import { useForm, SubmitHandler } from "react-hook-form";
import { useImmer } from "use-immer";

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
import { useMemo, useState } from "react";
import DropdownZone from "@/components/DropdownZone";
import { DragNDrop } from "@/components/DragNDrop";
import { z } from "zod";

const LoanPeriod = z.enum(["3", "6", "12", "24"]);
export type LoanPeriod = z.infer<typeof LoanPeriod>;

const LoanMethod = z.enum(["COLLATERAL", "BANK_STATEMENT"]);
export type LoanMethod = z.infer<typeof LoanMethod>;

const RequestLoanInput = z.object({
  amount: z.number(),
  period: LoanPeriod.nullish(),
  loanMethod: LoanMethod.nullish(),
});

export type RequestLoanInput = z.infer<typeof RequestLoanInput>;

export default function RequestLoan() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const { register, setValue, handleSubmit, getValues } =
    useForm<RequestLoanInput>();

  const [formValues, setFormValues] = useImmer<RequestLoanInput>({
    amount: 0,
    loanMethod: null,
    period: null,
  });

  const submitFunction = () => {
    console.log("la data enviada es:");
  };

  const isAllowedToContinueForm = useMemo(() => {
    if (step === 1) {
        if (formValues.amount < 1 || formValues.amount > 1000) return false;
        if (!formValues.period) return false;
      }
  
      if (step === 2) {
        return true;
      }
  
      return true;
  }, [step, formValues])

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
        {step === 1 && (
          <>
            <div className="flex flex-col gap-6 justify-between">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label
                  htmlFor="picture"
                  className="text-black font-light text-left text-nowrap flex flex-row gap-2"
                >
                  Amount{" "}
                  <p className="text-black opacity-40">(Expresed in USD)</p>
                </Label>
                <Input
                  value={Number(formValues.amount).toString()}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  max={1000}
                  type="number"
                  className="bg-[#f5f5fa] text-black"
                  onChange={(newValue) => {
                    let valueToSave = Number(newValue.target.value);
                    if (Number(newValue.target.value) > 1000) {
                      valueToSave = 1000;
                    }
                    setFormValues((draft) => {
                      draft.amount = valueToSave;
                    });
                    setValue("amount", valueToSave);
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between text-black text-xs">
                  <p>0$</p>
                  <p>500$</p>
                  <p>1000$</p>
                </div>

                <Slider
                  defaultValue={[0]}
                  value={[formValues.amount]}
                  onValueChange={(newValue) => {
                    setValue("amount", newValue[0], {
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                    setFormValues((draft) => {
                      draft.amount = newValue[0];
                    });
                  }}
                  max={1000}
                  step={10}
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
                  Choose the credit types you need—this won’t be stored and is
                  only for analysis purposes.
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
                <Select
                  onValueChange={(newValue) => {
                    console.log("new value of period", newValue)
                    const parsedValue = LoanPeriod.safeParse(newValue);
                    if (parsedValue.success)
                      setValue("period", parsedValue.data);

                    setFormValues((draft) => {
                      draft.period = parsedValue.data;
                    });
                  }}
                >
                  <SelectTrigger className="bg-[#f5f5fa] text-black">
                    <SelectValue placeholder="Select a period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="3">3 Months</SelectItem>
                      <SelectItem value="6">6 Months</SelectItem>
                      <SelectItem value="12">1 Year</SelectItem>
                      <SelectItem value="24">2 Years</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="flex flex-col gap-6 justify-between">
              <div className="w-full flex flex-col gap-2">
                <Label
                  htmlFor="picture"
                  className="text-black font-light text-left"
                >
                  Loan Eligibility Method
                </Label>
                <p className="text-xs text-black opacity-40">
                  Choose one: provide <strong>collateral</strong> or upload a{" "}
                  <strong>bank statement</strong> to prove your financial
                  history.
                </p>
                <Select
                  onValueChange={(newValue) => {
                    const parsedValue = LoanMethod.safeParse(newValue);
                    if (parsedValue.success)
                      setValue("loanMethod", parsedValue.data, {
                        shouldTouch: true,
                        shouldDirty: true,
                      });
                    setFormValues((draft) => {
                      draft.loanMethod = parsedValue.data;
                    });
                  }}
                >
                  <SelectTrigger className="bg-[#f5f5fa] text-black">
                    <SelectValue placeholder="Select one to continue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="COLLATERAL">Collateral</SelectItem>
                      <SelectItem value="BANK_STATEMENT">
                        Bank statement
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {formValues.loanMethod === "BANK_STATEMENT" && (
                <div className="w-full" bg-black p-4 mb-4>
                  <DragNDrop
                    height={220}
                    onFileDrop={(file) => {
                      console.log("file", file);
                    }}
                  />
                </div>
              )}

              {formValues.loanMethod === "COLLATERAL" && (
                <div className="w-full" bg-black p-4 mb-4>
                  <DropdownZone
                    textMode
                    open={true}
                    header="Terms and conditions for the Loan"
                    content={
                      <ul className="ml-6 list-disc">
                        <li className="font-outfit-regular text-gray-300 text-sm">
                          Collateral will be locked until the loan is repaid.
                        </li>
                        <li className="font-outfit-regular text-gray-300 text-sm">
                          The collateral required for this loan will be 125% of
                          the loan amount. For this Loan the required amount is
                          the equivalent of
                          <strong>{` ${getValues().amount * 1.25}`}</strong>{" "}
                          USD.
                        </li>
                        <li className="font-outfit-regular text-gray-300 text-sm">
                          Failure to repay the loan by the due date may result
                          in the lender seizing the collateral or{" "}
                          <strong>losing the funds</strong>.
                        </li>
                      </ul>
                    }
                  />
                </div>
              )}
            </div>
          </>
        )}
        <div className="flex flex-col gap-2">
          <Button
            className="bg-[#DB8323] text-[#ffffff] rounded-xl text-md w-full items-center h-11 disabled:bg-gray-300"
            onClick={() => {
              if (step === 1) {
                setStep(step + 1);
              }

              if (step === 2) {
                submitFunction();
              }
            }}
            disabled={!isAllowedToContinueForm}
          >
            {step === 1 && "Continue"}
            {step === 2 &&
              formValues.loanMethod === "COLLATERAL" &&
              "Accept Terms and conditions"}
            {step === 2 &&
              formValues.loanMethod === "BANK_STATEMENT" &&
              "Send for verification"}
          </Button>
          <Button
            className="text-black"
            variant={"ghost"}
            onClick={() => {
              if (step === 1) router.push("/home");
              if (step === 2) setStep(1);
            }}
          >
            {step === 1 ? "Cancel" : "Back"}
          </Button>
        </div>
      </div>
    </div>
  );
}
