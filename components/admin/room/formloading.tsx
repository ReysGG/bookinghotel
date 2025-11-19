import Skeleton from "@/components/CardSkeleton"

const FormLoading = () => {
    return (
        <div className="grid md:grid-cols-12 gap-5">
            {/* Left Column - Form Fields */}
            <div className="col-span-8 bg-white p-4">
                {/* Room name input */}
                <div className="mb-4">
                    <Skeleton className="h-10 w-full rounded-sm" />
                </div>
                
                {/* Description textarea */}
                <div className="mb-4">
                    <Skeleton className="h-32 w-full rounded-sm" />
                </div>
                
                {/* Amenities checkboxes */}
                <div className="mb-4 grid md:grid-cols-3 gap-4">
                    {[...Array(9)].map((_, index) => (
                        <div className="flex items-center mb-2" key={index}>
                            <Skeleton className="h-4 w-4 rounded" />
                            <Skeleton className="h-4 w-20 ml-2" />
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Right Column - Image Upload & Other Fields */}
            <div className="col-span-4 bg-white p-4">
                {/* Image upload area */}
                <div className="mb-4">
                    <Skeleton className="w-full aspect-video rounded-md" />
                </div>
                
                {/* Capacity input */}
                <div className="mb-4">
                    <Skeleton className="h-10 w-full rounded-sm" />
                </div>
                
                {/* Price input */}
                <div className="mb-4">
                    <Skeleton className="h-10 w-full rounded-sm" />
                </div>
                
                {/* Submit button */}
                <Skeleton className="h-11 w-full rounded-sm" />
            </div>
        </div>
    )
}

export default FormLoading