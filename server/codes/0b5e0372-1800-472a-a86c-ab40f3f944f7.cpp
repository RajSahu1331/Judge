#include <bits/stdc++.h>

using namespace std;



int main(){
    int tt;
    cin >> tt;
    while(tt--){
        int n, target;
        cin >> n >> target;
        vector<int> nums(n);
        for(int i = 0; i < n; i++){
            cin >> nums[i];
        }
        int ans = -1;
        int l = 0, r = n-1;
        while(l <= r){
            int mid = l + (r-l)/2;
            if(nums[mid] == target){
                ans = mid;
                break;
            }
            else if(nums[mid] < target){
                l = mid + 1;
            }
            else{
                r = mid - 1;
            }
        }
        cout<<ans<<endl;
    }
    return 0;
}