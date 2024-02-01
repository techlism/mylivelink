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
    const {user} = useUser();
    return(
        <Card className='m-4 p-5 min-w-[240px]'>
        <CardHeader>
          <div className='grid grid-cols-2 items-center w-[210px] '>
              <CardDescription>
              <Image
                  unoptimized
                  src={user?.imageUrl!}
                  alt={`${user?.username} profile picture`}
                  height={50}
                  width={50}
                  className='rounded-xl'
              />
              </CardDescription>
              <CardTitle className='font-medium'>@{user?.username}</CardTitle>
          </div>

        </CardHeader>
        <Separator/>
        <CardContent className='flex justify-between align-middle mt-4'>
          <h1 className='text-2xl font-semibold font-sans'>
              {userDetails.heading}
          </h1>
        </CardContent>
      </Card>
    )
}