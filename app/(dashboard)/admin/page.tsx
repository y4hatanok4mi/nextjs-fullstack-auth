import { auth } from "@/auth";
import UserLineChart from "@/components/charts/student-line-chart";
import BigLineChart from "@/components/charts/line-chart-big";
import VisitorChart from "@/components/charts/visitor-chart";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();
  const role = session?.user.role;

  if (role !== "admin") {
    return redirect("/auth/signin");
  }

  return (
    <div>
      <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbPage>Analytics</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbItem className="hidden md:block">
                <ModeToggle/>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <VisitorChart/>
          <UserLineChart/>
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <BigLineChart/>
        </div>
      </div>
      </SidebarInset>
    </div>
  );
}