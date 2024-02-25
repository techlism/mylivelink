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
// import { useUser } from '@clerk/nextjs';

export default function UserDetailCard({userDetails}:{userDetails:User}){
    return(
        <Card className='mb-4 p-4'>
        <CardHeader>
          <div className='grid lg:grid-cols-2 md:grid-cols-2 items-center sm:grid-cols-1 gap-3'>
              <CardDescription>
              {userDetails.userProfileURL !== "" &&
                <Image
                  unoptimized
                  src={userDetails?.userProfileURL}
                  alt={`${userDetails?.username} profile picture`}
                  height={100}
                  width={100}
                  className='rounded-lg'
              />}
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