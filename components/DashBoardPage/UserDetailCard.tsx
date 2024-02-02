import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { User } from '@/app/api/db/schema/users'
import { useUser } from '@clerk/nextjs';

export default function UserDetailCard({userDetails}:{userDetails:User}){
    return(
        <Card className='m-4 p-5 sm:max-w-[80vw] md:max-w-[45vw] lg:max-w-[30vw]'>
        <CardHeader>
          <div className='grid lg:grid-cols-2 md:grid-cols-2 items-center sm:grid-cols-1 gap-3'>
              <CardDescription>
              <Image
                  unoptimized
                  src={userDetails?.userProfileURL}
                  alt={`${userDetails?.username} profile picture`}
                  height={50}
                  width={50}
                  className='rounded-xl'
              />
              </CardDescription>
              <CardTitle className='font-medium sm:text-base'>@{userDetails?.username}</CardTitle>
          </div>

        </CardHeader>
        <Separator/>
        <CardContent className='flex justify-between align-middle mt-4'>
          <h1 className='lg:text-2xl sm:text-xl md:text-2xl font-semibold font-sans'>
              {userDetails.heading}
          </h1>
        </CardContent>
      </Card>
    )
}