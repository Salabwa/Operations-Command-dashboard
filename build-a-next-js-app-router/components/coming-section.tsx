import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ComingSection({
  title,
  description,
  focus
}: {
  title: string;
  description: string;
  focus: string[];
}) {
  return (
    <>
      <PageHeader title={title} description={description} />
      <div className="grid gap-4 lg:grid-cols-3">
        {focus.map((item) => (
          <Card key={item}>
            <CardHeader>
              <CardTitle>{item}</CardTitle>
              <CardDescription>Structured tracker module planned for this operations area.</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge tone="blue">Ready for next build phase</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
