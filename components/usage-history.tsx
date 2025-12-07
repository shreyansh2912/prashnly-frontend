"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDistanceToNow } from "date-fns"

interface UsageHistoryProps {
  history: Array<{
    id: string
    document: string
    tokens: number
    date: string
  }>
}

export function UsageHistory({ history }: UsageHistoryProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Document</TableHead>
            <TableHead>Tokens</TableHead>
            <TableHead className="text-right">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-muted-foreground">
                No usage history found.
              </TableCell>
            </TableRow>
          ) : (
            history.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.document}</TableCell>
                <TableCell>{item.tokens}</TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {formatDistanceToNow(new Date(item.date), { addSuffix: true })}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
