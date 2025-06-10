import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const DropdownComponent = () => {
  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="underline p-0 text-xs" asChild>
            detaylar
          </AccordionTrigger>

          <AccordionContent>
            This component is used to display a dropdown menu with multiple
            items.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default DropdownComponent;
