import { dummyAnalytics } from '@/lib/dummy-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';


export function StudentList() {
  return (
    <Card className="shadow-lg h-full">
      <CardHeader>
        <CardTitle>Student Engagement</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Engagement Score</TableHead>
              <TableHead className="text-right">Last Active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyAnalytics.students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{student.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Progress value={student.engagement} className="w-40" />
                    <span>{student.engagement}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">{student.last_active}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
