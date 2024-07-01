import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Markdown from "react-markdown"
import { sendToAll } from "@/actions/sendEmail"
import { useState, useRef } from "react"
import { UserButton } from "@clerk/nextjs";
import domtoimage from 'dom-to-image';

export function ConfirmModal({ content, emails }: { content: string, emails: any }) {

    const [processedContent, setProcessedContent] = useState(content);
    const [finalSubject, setFinalSubject] = useState('Email from Brave AI');

    const preprocessContentForEmail = (content: string) => {
        const lines = content.split('\n');
        setFinalSubject(
            // Remove the string Subject: without slicing and unmarkdownise the subject
            // ## Application for HR Position - [Your Name]
            lines[0].replace('Subject: ', '').replace(/[#*]/g, '').trim()
        );
        setProcessedContent(
            lines.slice(1).join('\n')
        );
    }

    const hasEmails = emails && emails.length > 0;

    const emailmodal = useRef<HTMLDivElement>(null); // Adjusted line

    const downloadEmailAsImage = () => {
        if (emailmodal.current) {
            domtoimage.toPng(emailmodal.current)
                .then(function (dataUrl: string) {
                    var link = document.createElement('a');
                    link.download = `${finalSubject}.png`;
                    link.href = dataUrl;
                    link.click();
                });
        }
    }

    return (
        <Dialog>
            {
                hasEmails && (
                    <DialogTrigger asChild className="m-4">
                        <Button onClick={() => preprocessContentForEmail(content)}>Schedule Email</Button>
                    </DialogTrigger>
                )
            }
            <DialogContent className="sm:max-w-5xl bg-secondary max-h-[85vh] overflow-y-scroll p-2 sm:p-8">
                <div ref={emailmodal} className="bg-background text-card-foreground rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarFallback>BA</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-lg font-semibold">
                                    {finalSubject}
                                </h3>
                                <p className="text-sm text-muted-foreground">edgexofficial@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="prose prose-sm prose-neutral">
                        <p className="whitespace-pre-line">
                            <Markdown>
                                {processedContent}
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
                    <Button className="bg-green-500 hover:bg-green-600" onClick={downloadEmailAsImage}>
                        Download
                    </Button>
                    <Button type="submit" onClick={() => sendToAll(
                        emails.map((email: any) => email.receiver),
                        processedContent,
                        finalSubject
                    )}>Confirm & Send</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
