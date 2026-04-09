import Arc53DataForm from "@/components/forms/arc53-data-form";
import Header from "@/components/header";
import HorizontalStepper from "@/components/steppers/horizontal";
import VerticalStepper from "@/components/steppers/vertical";
import FormDisplayProvider from "@/providers/form-display";

export default function Home() {
  return (
    <FormDisplayProvider>
      <Header />
      <div className="p-4">
        <VerticalStepper className="hidden md:block" />
        <HorizontalStepper className="w-full my-4 sticky md:hidden" />
        <div className="md:pl-80 pt-4 w-full">
          <Arc53DataForm />
        </div>
      </div>
    </FormDisplayProvider>
  );
}
