import Arc53DataForm from "@/components/forms/arc53-data-form";
import HorizontalStepper from "@/components/steppers/horizontal";
import VerticalStepper from "@/components/steppers/vertical";
import FormDisplayProvider from "@/providers/form-display";

export default function Home() {
  return (
    <FormDisplayProvider>
      <div className="p-4">
        <VerticalStepper className="hidden md:block" />
        <h1 className="w-full text-center text-2xl font-extrabold md:hidden">ARC53 BUILDER</h1>
        <HorizontalStepper className="w-full my-4 sticky md:hidden" />
        <div className="md:pl-80 pt-4 md:pt-12 w-full">
          <Arc53DataForm />
        </div>
      </div>
    </FormDisplayProvider>
  );
}
