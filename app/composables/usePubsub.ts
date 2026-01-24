/* eslint-disable @typescript-eslint/no-explicit-any */

type Callback = ((value: any) => void) | (() => void); 

export default function() {
    function Pubsub() {

        const events = useState<{[key : string] : Callback[] }>('pubsub-events', () => ({}));
        function subscribe(event_name : string, callback : Callback) {
            if(!events.value[event_name]) {
                events.value[event_name] = [];
            }
    
            events.value[event_name].push(callback);
    
            return () => {
                events.value[event_name] = events.value[event_name]?.filter(_cb => _cb !== callback) || [];
            }
        }
    
        function publish(event_name : string, args? : any) {
            const callbacks = events.value[event_name]
    
            if(callbacks) {
                callbacks.forEach(async (callback) => {
                    await callback(args);
                });
            }
        }

        return { publish, subscribe }
    }

    const instance = Pubsub();
    return instance
}
