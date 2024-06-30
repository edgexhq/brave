import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ConfirmModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Schedule Email</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-5xl p-2 sm:p-8">
                <div className="bg-background text-card-foreground rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src="/placeholder-user.jpg" />
                                <AvatarFallback>SN</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-lg font-medium">Sender Name</h3>
                                <p className="text-sm text-muted-foreground">sender@example.com</p>
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
                        <h2>Email Subject</h2>
                        <p>Dear Recipients,</p>
                        <p>
                            This is the content of the email. It can include formatted text, such as <strong>bold</strong>,{" "}
                            <em>italic</em>, and <a href="#">links</a>.
                        </p>
                        <p>The email can also include lists:</p>
                        <ul>
                            <li>Item 1</li>
                            <li>Item 2</li>
                            <li>Item 3</li>
                        </ul>
                        <p>
                            Thank you,
                            <br />
                            Sender Name
                        </p>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-lg font-medium mb-2">Recipients</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/placeholder-user.jpg" />
                                    <AvatarFallback>R1</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium">Recipient 1</p>
                                    <p className="text-sm text-muted-foreground">recipient1@example.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/placeholder-user.jpg" />
                                    <AvatarFallback>R2</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium">Recipient 2</p>
                                    <p className="text-sm text-muted-foreground">recipient2@example.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/placeholder-user.jpg" />
                                    <AvatarFallback>R3</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium">Recipient 3</p>
                                    <p className="text-sm text-muted-foreground">recipient3@example.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/placeholder-user.jpg" />
                                    <AvatarFallback>R4</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium">Recipient 4</p>
                                    <p className="text-sm text-muted-foreground">recipient4@example.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Confirm & Send</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
