"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3, { message: "Project name is required!" }),
  start_date: z.date(),
  end_date: z.date(),
  comments: z.string(),
  status: z.string(),
});

const ProjectDialog = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      start_date: undefined,
      end_date: undefined,
      comments: "",
      status: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("values", values);
    const project = {
      name: values.name,
      start_date: values.start_date,
      end_date: values.end_date,
      comments: values.comments,
      status: values.status,
    };

    try {
      const url = "http://127.0.0.1:8000/api/";
      // const url = process.env.NEXTAUTH_BACKEND_URL
      const response = await axios({
        url: `${url}project/`,
        method: "post",
        data: project,
      });
      const data = response.data;
      if (data) {
        toast.success("Project created");
        router.push("/");
      }
    } catch (error) {
      toast.error("Something went wrong...");
      console.log("error:", error.response.data);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new project</DialogTitle>
          <DialogDescription>
            This action will create a new project in the system. You will be
            able to add features to it in the future.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="project 1"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" variant="default">
              Create Project
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDialog;
