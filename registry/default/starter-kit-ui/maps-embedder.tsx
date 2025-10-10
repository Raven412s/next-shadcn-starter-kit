import { cn } from "@/lib/utils"

const MapsEmbedder = ({className, mapUrl="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d349.01779998166694!2d83.36284914690383!3d26.7562308741741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1760037405755!5m2!1sen!2sin"}:{className?: string, mapUrl: string}) => {
    return (
        <div className={cn("min-h-0 h-[600px] w-full",className)}>
            <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title='Embedded Map'
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    )
}

export default MapsEmbedder
