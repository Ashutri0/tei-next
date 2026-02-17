import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <h1 className="text-6xl font-bold text-primary mb-4 animate-in fade-in zoom-in duration-500">404</h1>
            <h2 className="text-3xl font-semibold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">Page Not Found</h2>
            <p className="text-lg text-muted-foreground max-w-md mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
                Sorry, the page you are looking for doesn't exist or has been moved.
            </p>
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500">
                <Button asChild size="lg">
                    <Link href="/">
                        Return Home
                    </Link>
                </Button>
            </div>
        </div>
    )
}
