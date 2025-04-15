"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const formSchema = z.object({
  phone: z
    .string()
    .min(10, {
      message: "Gecersiz Telefon Numarasi.",
    })
    .max(10, {
      message: "Gecersiz Telefon Numarasi.",
    }),
  name: z.string().min(2, {
    message: "Ad en az 2 karakter olmalıdır.",
  }),
  email: z.string().email("Gecersiz e-posta adresi."),
});

const ContactPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      name: "",
      email: "",
    },
  });

  const [details, setDetails] = useState<{
    hour: string;
    productIds: string[];
    businessId: string;
  }>();

  useEffect(() => {
    const businessId = localStorage.getItem("businessId");
    const hour = localStorage.getItem("selectedHour");
    const productIds = localStorage.getItem("productIds");

    setDetails({
      hour: hour ?? "",
      productIds: JSON.parse(productIds ?? "[]"),
      businessId: businessId ?? "",
    });
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { phone, name, email } = values;

    const requestBody = {
      c_phone: `+90${phone}`,
      c_name: name,
      c_email: email,
      hour: details?.hour,
      productIds: details?.productIds,
      businessId: details?.businessId,
    };

    console.log(requestBody);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 mt-5 w-screen h-full px-5 ">
      <h1 className="text-center text-2xl font-bold mb-4">
        İletişim Bilgileri
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full mx-5 "
        >
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon Numaraniz</FormLabel>
                <FormControl>
                  <div className="flex items-center border rounded-md px-3 py-2">
                    <span className="text-sm text-muted-foreground mr-2">
                      +90
                    </span>
                    <Input
                      type="tel"
                      placeholder="555 123 45 67"
                      {...field}
                      className={cn(
                        "border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                      )}
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adınız</FormLabel>
                <FormControl>
                  <div className="flex items-center border rounded-md px-3 py-2">
                    <Input
                      type="text"
                      placeholder="Adınız"
                      {...field}
                      className={cn(
                        "border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                      )}
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-posta Adresiniz</FormLabel>
                <FormControl>
                  <div className="flex items-center border rounded-md px-3 py-2">
                    <Input
                      type="email"
                      placeholder="E-posta Adresiniz"
                      {...field}
                      className={cn(
                        "border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                      )}
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Gönder</Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactPage;
