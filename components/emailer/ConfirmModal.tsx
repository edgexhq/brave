import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Markdown from "react-markdown"
import { sendEmail } from "@/actions/generateEmail"
import { sendToAll } from "@/actions/sendEmail"

export function ConfirmModal({ content, emails }: { content: string, emails: any }) {
    return (
        <Dialog>
            <DialogTrigger asChild className="m-4">
                <Button>Schedule Email</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-5xl max-h-[85vh] overflow-y-scroll p-2 sm:p-8">
                <div className="bg-background text-card-foreground rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src="/placeholder-user.jpg" />
                                <AvatarFallback>SN</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-lg font-medium">Brave AI</h3>
                                <p className="text-sm text-muted-foreground">rizzler3902@gmail.com</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                                Print
                            </Button>
                            <Button size="sm">Send</Button>
                        </div>
                    </div>
                    <div className="prose prose-sm prose-neutral">
                        <p className="whitespace-pre-line">
                            <Markdown>
                                {content}
                            </Markdown>
                        </p>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-lg font-medium mb-2">Recipients</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {
                                emails.map((email: any) => (
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src="/placeholder-user.jpg" />
                                            <AvatarFallback>{
                                                email.receiver[0]
                                            }</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm text-muted-foreground">{
                                                email.receiver
                                            }</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={() => sendToAll(
                        emails.map((email: any) => email.receiver),
                        content,
                        "Email to Brave AI"
                    )}>Confirm & Send</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
