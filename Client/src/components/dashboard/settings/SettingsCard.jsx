import react from 'react'
import {ChevronRight} from 'lucide-react'
import { Link } from 'react-router-dom'

const SettingsCard=({heading,des,color,logo,link,click})=>{
        {
            if(link){
                return(
                    <div>
                        <Link to={link}>
        <div className='flex items-center border-b-2 rounded-lg hover:bg-black/5 transition-all duration-200 group border-[#CBCBCB]/60 p-6 w-full justify-between '>
            <div className='flex flex-row justify-center items-center gap-8'>
              <div className={`p-5 rounded-full ${color}`}>
                {logo}
              </div>
              <div>
                <p className='font-semibold text-md leading-relaxed'>{heading}</p>
                <p className='text-[#6D8196] text-sm'>{des}</p>
              </div>
            </div>
            <div>
              <ChevronRight color='#6D8196' className='group-hover:translate-x-2 transition-transform duration-200'/>
            </div>
          </div>
          </Link>
                    </div>
                )
            }

            if(click){
                return(
                <div onClick={click}>
            <div className='flex items-center border-b-2 rounded-lg hover:bg-black/5 transition-all duration-200 group border-[#CBCBCB]/60 p-6 w-full justify-between '>
            <div className='flex flex-row justify-center items-center gap-8'>
              <div className={`p-5 rounded-full ${color}`}>
                {logo}
              </div>
              <div>
                <p className='font-semibold text-md leading-relaxed'>{heading}</p>
                <p className='text-[#6D8196] text-sm'>{des}</p>
              </div>
            </div>
            <div>
              <ChevronRight color='#6D8196' className='group-hover:translate-x-2 transition-transform duration-200'/>
            </div>
          </div>
          </div>
                )
            }
        }
}

export default SettingsCard