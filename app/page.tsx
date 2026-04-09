import Arc53DataForm from "@/components/forms/arc53-data-form";
import HorizontalStepper from "@/components/steppers/horizontal";
import VerticalStepper from "@/components/steppers/vertical";
import ConnectButton from "@/components/wallet/connect-button";
import NFDSelector from "@/components/wallet/nfd-selector";
import PinataKeyInput from "@/components/settings/pinata-key-input";
import FormDisplayProvider from "@/providers/form-display";

export default function Home() {
  return (
    <FormDisplayProvider>
      <div className="p-4">
        <VerticalStepper className="hidden md:block" />
        <div className="md:hidden">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-extrabold">ARC53 BUILDER</h1>
            <ConnectButton />
          </div>
          <NFDSelector />
          <PinataKeyInput />
          <HorizontalStepper className="w-full my-4 sticky" />
        </div>
        <div className="md:pl-80 pt-4 md:pt-12 w-full">
          <Arc53DataForm />
        </div>
      </div>
    </FormDisplayProvider>
  );
}
