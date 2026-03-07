import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});
    
    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
            .then((res) => res.json())
            .then((res) => {
                console.log("API Response:", res);
                // The API returns data with currency as the key
                setData(res[currency]);
            })
            .catch((error) => console.error("Error fetching currency data:", error));
    }, [currency]);
    
    console.log("Currency data:", data);
    return data;
}

export default useCurrencyInfo;