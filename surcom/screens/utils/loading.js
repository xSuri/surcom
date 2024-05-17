import style from './room.module.css';

import { View } from 'react-native';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function LoadingSkeleton() {
    return (
        <View style={[style.scroll, { height: "100%" }]}>
            <SkeletonPlaceholder borderRadius={6}>

                <SkeletonPlaceholder.Item>

                    <SkeletonPlaceholder.Item>

                        <SkeletonPlaceholder.Item width={120} height={40} marginBottom={'1.3%'} style={style.left}/>
                        <SkeletonPlaceholder.Item width={90} height={20} marginBottom={'1.3%'} style={style.left} />
                    
                        <SkeletonPlaceholder.Item width={50} height={20} marginBottom={'1.3%'} style={style.right}/>
                        <SkeletonPlaceholder.Item width={90} height={30} marginBottom={'1.3%'} style={style.right} />
                    
                        <SkeletonPlaceholder.Item width={140} height={40} marginBottom={'1.3%'} style={style.left}/>
                        <SkeletonPlaceholder.Item width={90} height={20} marginBottom={'1.3%'} style={style.left} />
                    
                        <SkeletonPlaceholder.Item width={90} height={20} marginBottom={'1.3%'} style={style.right}/>
                        <SkeletonPlaceholder.Item width={90} height={30} marginBottom={'1.3%'} style={style.right} />
                    
                        <SkeletonPlaceholder.Item width={14} height={40} marginBottom={'1.3%'} style={style.left}/>
                        <SkeletonPlaceholder.Item width={90} height={20} marginBottom={'1.3%'} style={style.left} />
                    
                        <SkeletonPlaceholder.Item width={90} height={20} marginBottom={'1.3%'} style={style.right}/>
                        <SkeletonPlaceholder.Item width={90} height={30} marginBottom={'1.3%'} style={style.right} />
                
                        <SkeletonPlaceholder.Item width={90} height={40} marginBottom={'1.3%'} style={style.left}/>
                        <SkeletonPlaceholder.Item width={90} height={20} marginBottom={'1.3%'} style={style.left} />
                    
                        <SkeletonPlaceholder.Item width={42} height={20} marginBottom={'1.3%'} style={style.right}/>
                        <SkeletonPlaceholder.Item width={90} height={30} marginBottom={'1.3%'} style={style.right} />
                
                    </SkeletonPlaceholder.Item>

                </SkeletonPlaceholder.Item>

            </SkeletonPlaceholder>
        </View>
    )
};