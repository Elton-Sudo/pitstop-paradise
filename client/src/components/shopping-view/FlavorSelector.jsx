import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import axios from "axios";

function FlavorSelector({ productId, onFlavorSelect }) {
    const [productDetails, setProductDetails] = useState(null);
    const [selectedFlavor, setSelectedFlavor] = useState("");

    useEffect(() => {
        console.log("Fetching product details for ID:", productId); // Log productId
        async function fetchProductDetails() {
            try {
                const response = await axios.get(`http://localhost:5000/api/admin/products/6717ee9...
`);
                setProductDetails(response.data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        }

        if (productId) { 
            fetchProductDetails();
        } else {
            console.error("Product ID is undefined");
        }
    }, [productId]);

    const handleFlavorChange = (e) => {
        const flavor = e.target.value;
        setSelectedFlavor(flavor);
        console.log("Selected flavor:", flavor); // Log the selected flavor
        onFlavorSelect(flavor); 
    };

    return (
        <div className="mt-4">
            <Label>Select Flavor</Label>
            <select
                value={selectedFlavor}
                onChange={handleFlavorChange}
                className="w-full border border-gray-300 rounded-md p-2 mt-1"
                disabled={!productDetails?.flavors?.length} 
            >
                <option value="" disabled>
                    {productDetails?.flavors?.length ? "Choose a flavor" : "Loading..."}
                </option>
                {productDetails?.flavors?.map((flavor) => ( 
                    <option key={flavor.id} value={flavor.name}> 
                        {flavor.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default FlavorSelector;

