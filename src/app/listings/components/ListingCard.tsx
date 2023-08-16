'use client'
import { Listing } from "@prisma/client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/solid';

interface ListingCardProps {
    listing: Listing[]
    anyFilters: boolean
    anyListings: boolean
}

export const ListingCard: React.FC<ListingCardProps> = ({listing, anyFilters, anyListings}) => {

    const router = useRouter();

    const [selectedSlug, setSelectedSlug] = useState("")

    console.log(selectedSlug)

    useEffect (() => {
            const queryParams = new URLSearchParams('=');
            queryParams.append('slug', selectedSlug);
            
            if(selectedSlug.length > 0) {
            router.push(`/listings/${selectedSlug}`);
            } else {
                setSelectedSlug(selectedSlug)
            }
    }, [selectedSlug, router])

    const checkFilters = () => {
      if(anyFilters) {
        return "Listings based on your search"
      } else {
        return "All listings"
      }
    }

    const listingsText = checkFilters()

      // if there are no listings
    if(anyListings) {
      return (
        <div className='min-h-screen min-w-full flex items-center justify-center'>
        <div className="bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
          <div className="max-w-max mx-auto">
            <main className="sm:flex">
              {/* <p className="text-4xl font-bold text-british-green-0 sm:text-5xl font-rubik">404</p> */}
              <DocumentMagnifyingGlassIcon className="fill-british-green-0 w-12 h-12 "/>
              <div className="sm:ml-6">
                <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                  <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl font-rubik">No results</h1>
                  <p className="mt-1 text-base text-gray-500 font-rubik">No listings were found based on your search. Try again with different filters.</p>
                </div>
                <div className="mt-8 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                  <a
                    href="/"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-british-green-0 hover:bg-british-green-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-british-green-2"
                  >
                    Go back
                  </a>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
        )
    }

    return (
        <>
          <div className="flex flex-col items-center justify-center pt-20">
          <p className="font-bold text-3xl font-rubik text-gray-900 pb-4">{listingsText}</p>
        <div className="flex flex-row flex-wrap	max-w-6xl mx-auto gap-x-20 mb-20">
        {listing?.map((item) => (
          <div 
          onClick={() => setSelectedSlug(item.slug)}
          key={item.id} className="cursor-pointer mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-british-green-1 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
            <img className="h-48 w-full object-cover object-center" src="https://images.unsplash.com/photo-1599076311391-28adf17fade5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Product Image" />
            <div className="p-4">
              <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">{item.title}</h2>
              <h3 className="mb-2 text-md font-medium dark:text-white text-gray-900">{item.year}, {item.fuel}, {item.mileage}</h3>
              <p className="mb-2 text-base dark:text-gray-300 text-gray-700">{item.body}</p>
              <div className="flex items-center">
                <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">€{item.price}</p>
              </div>
            </div>
          </div>
        ))}
        </div>
        </div>
        </>
        )      
      
    // return (
    //     <>
    //     <div className="flex flex-row flex-wrap	max-w-6xl mx-auto mb-20">
    //       <div 
    //       onClick={() => handleOnClick(listing.slug)} 
    //       key={listing.id} className="cursor-pointer mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-british-green-1 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
    //         <img className="h-48 w-full object-cover object-center" src="https://images.unsplash.com/photo-1599076311391-28adf17fade5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Product Image" />
    //         <div className="p-4">
    //           <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">{listing.title}</h2>
    //           <h3 className="mb-2 text-md font-medium dark:text-white text-gray-900">{listing.year}, {listing.fuel}, {listing.mileage}</h3>
    //           <p className="mb-2 text-base dark:text-gray-300 text-gray-700">{listing.body}</p>
    //           <div className="flex items-center">
    //             <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">€{listing.price}</p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     </>
    //     )      
}

export default ListingCard