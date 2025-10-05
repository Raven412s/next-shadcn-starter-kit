
const MapsEmbedder = ({className, mapUrl}:{className?: string, mapUrl: string}) => {
    return (
        <div className={className}>
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
